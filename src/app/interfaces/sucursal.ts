export interface Sucursal {
    sucCodigo: number;
    sucDescripcion: string;
    sucDireccion: string;
    sucIdentificacion: string;
    mndId: number;
    mndNombre: string;
    sucFchReg: Date;
}

export interface RSucursal {
    successful: boolean;
    message: string;
    count: number;
    data: Sucursal;
    detail?: any;
    pageSize: number;
    pageNumber: number;
    totalElements: number;
    totalPages: number;
}

export interface RSucursales {
    successful: boolean;
    message: string;
    count: number;
    data: Sucursal[];
    detail?: any;
    pageSize: number;
    pageNumber: number;
    totalElements: number;
    totalPages: number;
}