import { ErrorConstraints } from '@shared/constraints/error-constraints';
import { IHttpErrorResponse } from '@shared';

const ErrorUtil = {
    getErrorObject: (err: IHttpErrorResponse) => {
        console.log(err);
        let type = err.error ? err.error.type : null;
        for (let error of Object.keys(ErrorConstraints)) {
            if (type === ErrorConstraints[error as keyof typeof ErrorConstraints].type) {
                return ErrorConstraints[error as keyof typeof ErrorConstraints];
            }
        }
        return type ? ErrorConstraints.DEFAULT_ERROR : ErrorConstraints.SERVER_NOT_RESPONDING;
    },
};

export default ErrorUtil;
