interface FieldErrorProps{
    error? : unknown
    className? : string
}

export function FieldError ({error, className}: FieldErrorProps){
    if(!error){
        return null
    }
    if(Array.isArray(error)){
        if(error.length == 0){
            return null
        }
        const firstError = error[0]
        const errorMessage = typeof firstError === 'string' ? firstError : typeof firstError === 'object' && firstError !== null && 'message' in firstError ? String(firstError.message ?? "invalid Value") : "Invalid value"
        return <p className={`text-sm text-destructive ${className ?? ""}`}>
            {errorMessage}
        </p>
    }
    
}