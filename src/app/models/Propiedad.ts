export class Propiedad{
    id_propiedad: number;
    id_tipoNeg: number;
    id_tipoProp: number;
    titulo: string; 
    ciudad: string;
    direccion: string;
    precio: number;
    No_habitaciones: number;
    No_banos: number;
    desc_prop: string;
    area_construida: number;
    id_vendedor: number;

    //Estos datos no van en el formulario
    nombre_vendedor: string;
    apellido_vendedor: string;
    email_vendedor: string;
    telefono: string;
}