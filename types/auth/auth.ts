interface LoginForm {
    login: string
    password: string
}

interface selectRoleForm {
    accountRoleId: number
    tempToken: string
}

export {
    type LoginForm,
    type selectRoleForm
}