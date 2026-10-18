export interface IUSER {
    _id: string,
    name: string,
    email: string,
    password: string,
    mobile: string,
    createdAt?: Date, 
    // ? is defined as optional property
    updatedAt?: Date
}

export interface RegisterBody{
    name: string,
    email: string,
    password: string,
    mobile: string
}

export interface LoginBody{
    email: string,
    password: string
}

export interface JWTpayload{
    userId: string,
    email?: string,
}

