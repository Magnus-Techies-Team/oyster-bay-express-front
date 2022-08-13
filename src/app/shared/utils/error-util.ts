import { ErrorConstraints } from '@shared/constraints/error-constraints';
import { IHttpErrorResponse } from '@shared';

const ErrorUtil = {
    getErrorMessage: (err: IHttpErrorResponse) => {
        console.log(err);
        let type = err.error ? err.error.type : null;
        for (let error of Object.keys(ErrorConstraints)) {
            if (type === ErrorConstraints[error as keyof typeof ErrorConstraints].type) {
                return ErrorConstraints[error as keyof typeof ErrorConstraints].message;
            }
        }
        return type ? ErrorConstraints.DEFAULT_ERROR.message : ErrorConstraints.SERVER_NOT_RESPONDING.message;
    },
};

export default ErrorUtil;
