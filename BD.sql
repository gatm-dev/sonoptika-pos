-- USE master
-- DROP DATABASE _SAC_
-- CREATE DATABASE _SAC_

USE _SAC_

CREATE TABLE CatTipoUsuario (
    IdTipoUsr       INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    TipoUsr         VARCHAR(50)     NOT NULL,
    Descrip         VARCHAR(100)    NULL,
    Activo          BIT             NOT NULL    DEFAULT 1,
    FecAlta         DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta         VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    FecModi         DATETIME        NULL,
    UsrModi         VARCHAR(50)     NULL
) GO

INSERT INTO CatTipoUsuario (TipoUsr, Descrip) VALUES 
    ('ADMINISTRADOR', 'ADMINISTRADOR DEL SISTEMA'),
    ('VENTAS / OPTOMETRISTA', 'USUARIO DE VENTAS / OPTOMETRISTA'),
    ('CLIENTE', 'CLIENTE')
GO

CREATE TABLE CatUsuarios (
    IdUsuario       INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    IdTipoUsuario   INT             NOT NULL    FOREIGN KEY REFERENCES CatTipoUsuario(IdTipoUsr),
    Usr             VARCHAR(50)     NOT NULL,
    Pwd             VARCHAR(50)     NOT NULL,
    ApellidoP       VARCHAR(50)     NOT NULL,
    ApellidoM       VARCHAR(50)     NOT NULL,
    Nombre          VARCHAR(50)     NOT NULL,
    Email           VARCHAR(50)     NULL,
    Tel             VARCHAR(50)     NULL,
    Activo          BIT             NOT NULL    DEFAULT 1,
    FecAlta         DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta         VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    UsrModi         VARCHAR(50)     NULL,
    FecModi         DATETIME        NULL
) GO

INSERT INTO CatUsuarios (IdTipoUsuario, Usr, Pwd, ApellidoP, ApellidoM, Nombre, Email, Tel) VALUES 
    (1, 'webmaster', '1234', 'García', 'Trejo', 'Michelle Ulises', 'contacto.gatm@gmail.com', '5519000933'),
    (2, 'ventas1', '1234', 'Molina', 'Mercado', 'Sarah', 'ventas@sonoptika.com', '5614870905')
GO

CREATE TABLE CatTipoProducto(
    IdTipoProducto  INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    Categoria       VARCHAR(50)     NOT NULL,
    TipoProducto    VARCHAR(50)     NOT NULL,
    Descrip         VARCHAR(100)    NULL,
    Activo          BIT             NOT NULL    DEFAULT 1,
    FecAlta         DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta         VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    FecModi         DATETIME        NULL,
    UsrModi         VARCHAR(50)     NULL
) GO

INSERT INTO CatTipoProducto(Categoria, TipoProducto, Descrip) VALUES 
    ('ARMAZON', 'Armazones Oftálmicos', 'Lentes con diseño especial para tus lentes oftálmicas'),
    ('ARMAZON', 'Armazones Solares', 'Lentes para lucir en ambientes de sol'),
    ('MICA', 'Micas Solares', 'Micas para proteger tus ojos de la luz solar'),
    ('MICA', 'Micas Oftálmicas', 'Micas especializadas para tu salud visual'),
    ('TRATAMIENTO', 'Antireflejante', 'Tratamiento de antireflejo'),
    ('TRATAMIENTO', 'Polarizado', 'Tratamiento polarizado'),
    ('TRATAMIENTO', 'Entintado', 'Perzonaliza tus micas con un color a tu gusto'),
    ('SERVICIO', 'Biselado', 'Servicio de corte y montaje de micas sobre el armazon'),
    ('SERVICIO', 'Mantenimiento', 'Servicio de mantenimiento al armazon'),
    ('CONSUMIBLE', 'Estuche', 'Estuche para guardar tus lentes'),
    ('CONSUMIBLE', 'Paño', 'Paño para limpiar tus lentes'),
    ('CONSUMIBLE', 'Cordón', 'Cordón para colgar tus lentes'),
    ('CONSUMIBLE', 'Líquido', 'Líquido para limpiar tus lentes')
GO

CREATE TABLE CatProductos (
    IdProducto      INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    IdTipoProducto  INT             NOT NULL    FOREIGN KEY REFERENCES CatTipoProducto(IdTipoProducto),
    Sku             VARCHAR(50)     NOT NULL,
    Marca           VARCHAR(50)     NOT NULL,
    Modelo          VARCHAR(50)     NOT NULL,
    NombreComercial VARCHAR(50)     NOT NULL,
    Descrip         VARCHAR(100)    NULL,
    ExistenciaGlobal INT            NOT NULL    DEFAULT 1,
    EnExibicion     INT             NOT NULL    DEFAULT 0,
    PuntoReorden    INT             NOT NULL    DEFAULT 0,
    PrecioCompra    DECIMAL(10,2)   NOT NULL,
    PrecioVenta     DECIMAL(10,2)   NOT NULL,
    Precio          DECIMAL(10,2)   NOT NULL,
    Activo          BIT             NOT NULL    DEFAULT 1,
    FecAlta         DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta         VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    FecModi         DATETIME        NULL,
    UsrModi         VARCHAR(50)     NULL
) GO

CREATE TABLE RelCombos(
    IdReg           INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    IdProdPadre     INT             NOT NULL    FOREIGN KEY REFERENCES CatProductos(IdProducto),
    IdProdHijo      INT             NOT NULL    FOREIGN KEY REFERENCES CatProductos(IdProducto),
    Activo          BIT             NOT NULL    DEFAULT 1,
    FecAlta         DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta         VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    FecModi         DATETIME        NULL,
    UsrModi         VARCHAR(50)     NULL
) GO

CREATE TABLE DefMicas( 
    IdReg           INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    IdProducto      INT             NOT NULL    FOREIGN KEY REFERENCES CatProductos(IdProducto),
    Procesada       BIT             NOT NULL    DEFAULT 0,
    Material        VARCHAR(50)     NOT NULL,
    SphDesde        DECIMAL(10,2)   NOT NULL,
    SphHasta        DECIMAL(10,2)   NOT NULL,
    CylDesde        DECIMAL(10,2)   NOT NULL,
    CylHasta        DECIMAL(10,2)   NOT NULL,
    AddDesde        DECIMAL(10,2)   NULL,
    AddHasta        DECIMAL(10,2)   NULL,
    Escala          DECIMAL(10,2)   NOT NULL,
    Activo          BIT             NOT NULL    DEFAULT 1,
    FecAlta         DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta         VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    FecModi         DATETIME        NULL,
    UsrModi         VARCHAR(50)     NULL
) GO

CREATE TABLE DefArmazones(
    IdReg           INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    IdProducto      INT             NOT NULL    FOREIGN KEY REFERENCES CatProductos(IdProducto),
    Variante        VARCHAR(50)     NOT NULL,
    Material        VARCHAR(50)     NOT NULL,
    Talla           VARCHAR(50)     NOT NULL,
    Color           VARCHAR(50)     NOT NULL,
    Genero          VARCHAR(50)     NOT NULL,
    Med_A           DECIMAL(10,2)   NOT NULL,
    Med_B           DECIMAL(10,2)   NOT NULL,
    Med_ED          DECIMAL(10,2)   NOT NULL,
    Med_DBL         DECIMAL(10,2)   NOT NULL,
    Med_Varilla     DECIMAL(10,2)   NOT NULL,
    Med_Puente      DECIMAL(10,2)   NOT NULL,
    Activo          BIT             NOT NULL    DEFAULT 1,
    FecAlta         DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta         VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    FecModi         DATETIME        NULL,
    UsrModi         VARCHAR(50)     NULL
) GO

CREATE TABLE CatColecciones(
    IdColeccion     INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    Coleccion       VARCHAR(50)     NOT NULL,
    Descrip         VARCHAR(100)    NULL,
    Activo          BIT             NOT NULL    DEFAULT 1,
    FecAlta         DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta         VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    FecModi         DATETIME        NULL,
    UsrModi         VARCHAR(50)     NULL
) GO

CREATE TABLE RelColecciones(
    IdReg           INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    IdColeccion     INT             NOT NULL    FOREIGN KEY REFERENCES CatColecciones(IdColeccion),
    IdProducto      INT             NOT NULL    FOREIGN KEY REFERENCES CatProductos(IdProducto),
    Activo          BIT             NOT NULL    DEFAULT 1,
    FecAlta         DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta         VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    FecModi         DATETIME        NULL,
    UsrModi         VARCHAR(50)     NULL
) GO

CREATE TABLE CatConvenios(
    IdConvenio      INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    Convenio        VARCHAR(50)     NOT NULL,
    Descrip         VARCHAR(100)    NULL,
    Activo          BIT             NOT NULL    DEFAULT 1,
    FecAlta         DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta         VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    FecModi         DATETIME        NULL,
    UsrModi         VARCHAR(50)     NULL
) GO

INSERT INTO CatConvenios(Convenio, Descrip) VALUES 
    ('Ninguno', 'Sin convenio')
GO

CREATE TABLE CatClientes(
    IdCliente       INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    IdConvenio      INT             NOT NULL    FOREIGN KEY REFERENCES CatConvenios(IdConvenio) DEFAULT 1,
    ApellidoP       VARCHAR(50)     NOT NULL,
    ApellidoM       VARCHAR(50)     NOT NULL,
    Nombre          VARCHAR(50)     NOT NULL,
    Tel             VARCHAR(50)     NOT NULL,
    Email           VARCHAR(50)     NOT NULL,
    Direccion       VARCHAR(50)     NOT NULL,
    Colonia         VARCHAR(50)     NOT NULL,
    Ciudad          VARCHAR(50)     NOT NULL,
    Estado          VARCHAR(50)     NOT NULL,
    CP              VARCHAR(50)     NOT NULL,
    Activo          BIT             NOT NULL    DEFAULT 1,
    FecAlta         DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta         VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    FecModi         DATETIME        NULL,
    UsrModi         VARCHAR(50)     NULL
) GO

CREATE TABLE RegDiagnosticoCliente(
    IdDiagnostico   INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    IdCliente       INT             NOT NULL    FOREIGN KEY REFERENCES CatClientes(IdCliente),
    SphOD           DECIMAL(10,2)   NOT NULL,
    CylOD           DECIMAL(10,2)   NOT NULL,
    EjeOD           DECIMAL(10,2)   NOT NULL,
    AddOD           DECIMAL(10,2)   NULL,
    AltOD           DECIMAL(10,2)   NULL,
    SphOI           DECIMAL(10,2)   NOT NULL,
    CylOI           DECIMAL(10,2)   NOT NULL,
    EjeOI           DECIMAL(10,2)   NOT NULL,
    AddOI           DECIMAL(10,2)   NULL,
    AltOI           DECIMAL(10,2)   NULL,
    DistPupilar     DECIMAL(10,2)   NULL,
    AltPantoscopica DECIMAL(10,2)   NULL,
    Observaciones   VARCHAR(100)    NULL,
    Activo          BIT             NOT NULL    DEFAULT 1,
    FecAlta         DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta         VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    FecModi         DATETIME        NULL,
    UsrModi         VARCHAR(50)     NULL
)

CREATE TABLE RegVentas (
    IdVenta         INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    IdCliente       INT             NOT NULL    FOREIGN KEY REFERENCES CatClientes(IdCliente),
    IdDiagnostico   INT             NOT NULL    FOREIGN KEY REFERENCES RegDiagnosticoCliente(IdDiagnostico),
    EsquemaVenta    VARCHAR(50)     NOT NULL,
    EstatusVenta    VARCHAR(50)     NOT NULL,
    EsquemaPago     VARCHAR(50)     NOT NULL,
    EstatusPago     VARCHAR(50)     NOT NULL,
    MetodoPago      VARCHAR(50)     NOT NULL,
    Diferido        BIT             NOT NULL    DEFAULT 0,
    RangoDiferido   VARCHAR(50)     NULL,
    PagosDiferidos  INT             NULL,
    FecVenta        DATETIME        NOT NULL    DEFAULT (GETDATE()),
    FecLiquidado    DATETIME        NULL,
    FecEntrega      DATETIME        NULL,
    Activo          BIT             NOT NULL    DEFAULT 1,
    FecAlta         DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta         VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    FecModi         DATETIME        NULL,
    UsrModi         VARCHAR(50)     NULL
) GO

CREATE TABLE RegVentaPagos(
    IdReg          INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    IdVenta        INT             NOT NULL    FOREIGN KEY REFERENCES RegVentas(IdVenta),
    Monto          DECIMAL(10,2)   NOT NULL,
    PagoNo         INT             NOT NULL,
    PagosFaltantes INT             NOT NULL,
    FecPago        DATETIME        NOT NULL    DEFAULT (GETDATE()),
    Activo         BIT             NOT NULL    DEFAULT 1,
    FecAlta        DATETIME        NOT NULL    DEFAULT (GETDATE()),
    UsrAlta        VARCHAR(50)     NOT NULL    DEFAULT ('SYSTEM'),
    FecModi        DATETIME        NULL,
    UsrModi        VARCHAR(50)     NULL
) GO

CREATE TABLE DetVentas(
    IdReg           INT             NOT NULL    IDENTITY(1,1)    PRIMARY KEY,
    IdVenta         INT             NOT NULL    FOREIGN KEY REFERENCES RegVentas(IdVenta),
    IdProducto      INT             NOT NULL    FOREIGN KEY REFERENCES CatProductos(IdProducto),
    IdColeccion     INT             NOT NULL    FOREIGN KEY REFERENCES CatColecciones(IdColeccion),
    IdLente         INT             NOT NULL    FOREIGN KEY REFERENCES CatLentes(IdLente),
    IdTratamiento   INT             NOT NULL    FOREIGN KEY REFERENCES CatTratamientos(IdTratamiento),
    IdMaterial      INT             NOT NULL    FOREIGN KEY REFERENCES CatMateriales(IdMaterial),
    IdColor         INT             NOT NULL    FOREIGN KEY REFERENCES CatColores(IdColor),
    IdTipoArmazon   INT             NOT NULL    FOREIGN KEY REFERENCES CatTiposArmazon(IdTipoArmazon),
    IdTipoCristal   INT             NOT NULL    FOREIGN KEY REFERENCES CatTiposCristal(IdTipoCristal),
    IdTipoLente     INT             NOT NULL    FOREIGN KEY REFERENCES CatTiposLente(IdTipoLente),
    IdTipoTratamiento INT           NOT NULL    FOREIGN KEY REFERENCES CatTiposTratamiento(IdTipoTratamiento),
    IdTipoMaterial  INT             NOT NULL    FOREIGN KEY REFERENCES CatTiposMaterial(IdTipoMaterial),
    IdTipoColor     INT             NOT NULL    FOREIGN KEY REFERENCES CatTiposColor(IdTipoColor),
    IdTipoColeccion INT             NOT NULL    FOREIGN KEY REFERENCES CatTiposColeccion(IdTipoColeccion),
    IdTipoProducto  INT             NOT NULL    FOREIGN KEY REFERENCES CatTiposProducto(IdTipoProducto),
    IdTipoVenta     INT             NOT NULL    FOREIGN KEY REFERENCES CatTiposVenta(IdTipoVenta),
    IdTipoPago      INT             NOT NULL    FOREIGN KEY REFERENCES CatTiposPago(IdTipoPago),
    IdTipoConvenio  INT             NOT NULL    FOREIGN KEY REFERENCES CatTiposConvenio(IdTipoConvenio),
    IdTipoCliente   INT             NOT NULL    FOREIGN KEY REFERENCES CatTiposCliente(IdTipoCliente),
    IdTipoDiagnostico INT           NOT NULL    FOREIGN KEY REFERENCES CatTiposDiagnostico(IdTipoDiagnostico),
    IdTipoVenta     INT             NOT NULL    FOREIGN KEY REFERENCES CatTiposVenta(IdTipoVenta),
    IdTipoPago      INT             NOT NULL    FOREIGN KEY REFERENCES CatTiposPago(IdTipoPago
)