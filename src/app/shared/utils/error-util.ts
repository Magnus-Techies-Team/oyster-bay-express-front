import { ErrorConstraints } from '@shared/constraints/error-constraints';
import { IError, IHttpErrorResponse } from '@shared';

export function isIError(object: IHttpErrorResponse | IError): object is IHttpErrorResponse {
    return 'type' in object && 'message' in object;
}

export class WSError extends Error {

    public errorObj: IError;

    constructor(errorObj: IError) {
        super('ws error');
        this.errorObj = errorObj;
    }
}


const ErrorUtil = {
    getErrorObject: (err: IError) => {
        let type: string = err.type;

        for (let error of Object.keys(ErrorConstraints)) {
            if (type === ErrorConstraints[error as keyof typeof ErrorConstraints].type) {
                return ErrorConstraints[error as keyof typeof ErrorConstraints];
            }
        }
        return type ? ErrorConstraints.DEFAULT_ERROR : ErrorConstraints.SERVER_NOT_RESPONDING;
    },
};

export default ErrorUtil;
