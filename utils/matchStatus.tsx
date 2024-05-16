export const matchStatus = (status: string) => {
    switch (status) {
        case "COMPLETED":
            return "success"
    
        case "IN_PROGRESS":
            return "warning"

        case "PENDING":
            return "danger"
        default:
            return "default";
    }
}