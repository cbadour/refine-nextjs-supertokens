import { HttpError } from "@refinedev/core";
import { PostgrestError } from "@supabase/supabase-js";

const constraintsTypes = {
    maxLength: "maxlength"
}

const buildFieldError = (fieldName: string, constraintType: string) => {
    let message = "";
    switch (constraintType) {
        case constraintsTypes.maxLength:
            message = `${fieldName} max length exeeded`
            break;

        default:
            break;
    }

    return message;
}

const handleCheckConstraintError = (error: HttpError) => {
    const message = error.message;
    const messageWords = message.split(" ");
    const constraintName = messageWords.findIndex(mw => mw === "constraint") + 1;
    const [column, type] = messageWords[constraintName]
        .replace('\"', "")
        .replace('"', '')
        .split('_');
    error.errors[column] = buildFieldError(column, type);
    error.message = buildFieldError(column, type);
}

const mapError = (error: HttpError) => {
    if (error) {
        error.errors = {};
        switch (parseInt(error.code)) {
            case 23514:
                handleCheckConstraintError(error);
                break;
            default:
                error.message = 'Error, Please check your console';
                break;
        }
    }

    return error;
}

export const handleError = (error: PostgrestError) => {
    const customError: HttpError = {
        ...error,
        message: error.message,
        statusCode: parseInt(error.code)
    };
    const mappedError = mapError(customError);
    return Promise.reject(mappedError);
}
