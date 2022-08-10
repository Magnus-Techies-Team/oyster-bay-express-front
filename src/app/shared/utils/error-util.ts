import { ErrorConstraints } from '@shared/constraints/error-constraints';

const ErrorUtil = {
    getErrorMessage: (err: any) => {
        let reason = err.error ? err.error.reason : null;
        for (let error of Object.keys(ErrorConstraints)) {
            if (reason === ErrorConstraints[error as keyof typeof ErrorConstraints].reason) {
                return ErrorConstraints[error as keyof typeof ErrorConstraints].message;
            }
        }
        return reason ? ErrorConstraints.DEFAULT_ERROR.message : ErrorConstraints.SERVER_NOT_RESPONDING.message;
    },
};

export default ErrorUtil;
