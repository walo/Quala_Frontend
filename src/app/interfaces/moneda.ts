export interface Moneda {
    mndId: number;
    mndNombre: string;
}

export interface RMoneda {
    successful: boolean;
    message: string;
    count: number;
    data: Moneda;
    detail?: any;
    pageSize: number;
    pageNumber: number;
    totalElements: number;
    totalPages: number;
}

export interface RMonedas {
    successful: boolean;
    message: string;
    count: number;
    data: Moneda[];
    detail?: any;
    pageSize: number;
    pageNumber: number;
    totalElements: number;
    totalPages: number;
}