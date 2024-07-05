export default interface GenericState<T> {
    data?: T
    status: 'loading' | 'finished' | 'error'
    errorMessage: string | null | undefined
}