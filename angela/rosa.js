import * as THREE from 'https://unpkg.com/three@0.180.0/build/three.module.js';

import {
    OrbitControls
} from 'https://unpkg.com/three@0.180.0/examples/jsm/controls/OrbitControls.js';


// =====================================================
// ESCENA
// =====================================================

const scene = new THREE.Scene();


// =====================================================
// CAMARA
// =====================================================

const camara = new THREE.PerspectiveCamera(
    48,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camara.position.set(
    0,
    2.8,
    8.5
);


// =====================================================
// RENDER
// =====================================================

const render = new THREE.WebGLRenderer({
    antialias: true
});

render.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.5)
);

render.setSize(
    window.innerWidth,
    window.innerHeight
);

render.setClearColor(
    0x010400,
    1
);

document
    .getElementById('three-container')
    .appendChild(render.domElement);


// =====================================================
// CORAZON
// =====================================================

const geometryCorazon =
    new THREE.BufferGeometry();

const vertices = [];

const cantidad = 10000;


// =====================================================
// POSICIONES ALEATORIAS
// =====================================================

for (
    let i = 0;
    i < cantidad;
    i++
) {

    const x =
        (Math.random() - 0.5) * 10;

    const y =
        (Math.random() - 0.5) * 10;

    const z =
        (Math.random() - 0.5) * 10;

    vertices.push(
        x,
        y,
        z
    );
}


geometryCorazon.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
        vertices,
        3
    )
);


// =====================================================
// TEXTURA DEL CORAZON
// =====================================================

const canvasCorazon =
    document.createElement('canvas');

canvasCorazon.width = 64;
canvasCorazon.height = 64;

const ctxCorazon =
    canvasCorazon.getContext('2d');

ctxCorazon.beginPath();

ctxCorazon.arc(
    32,
    32,
    30,
    0,
    Math.PI * 2
);

const gradienteCorazon =
    ctxCorazon.createRadialGradient(
        32,
        22,
        4,
        32,
        42,
        34
    );

gradienteCorazon.addColorStop(
    0,
    '#fff700'
);

gradienteCorazon.addColorStop(
    0.45,
    '#ffe600'
);

gradienteCorazon.addColorStop(
    0.75,
    '#9acd32'
);

gradienteCorazon.addColorStop(
    1,
    '#2f7d32'
);

ctxCorazon.fillStyle =
    gradienteCorazon;

ctxCorazon.fill();


const texturaCorazon =
    new THREE.CanvasTexture(
        canvasCorazon
    );


// =====================================================
// MATERIAL CORAZON
// =====================================================

const materialCorazon =
    new THREE.PointsMaterial({

        size: 0.20,

        color: 0xffff00,

        transparent: true,

        opacity: 0.8,

        map: texturaCorazon,

        alphaTest: 0.01

    });


// =====================================================
// CREAR CORAZON
// =====================================================

const puntosCorazon =
    new THREE.Points(
        geometryCorazon,
        materialCorazon
    );


// =====================================================
// TAMAÑO DEL CORAZON
// =====================================================

puntosCorazon.scale.set(
    0.6,
    0.6,
    0.6
);

scene.add(
    puntosCorazon
);


// =====================================================
// FORMA DEL CORAZON
// =====================================================

const puntosCorazones = [];

for (
    let i = 0;
    i < cantidad;
    i++
) {

    const frecuencia = 12;

    const amplitudx = 0.13;

    const amplitudy = 0.13;

    const t =
        (i / cantidad) *
        Math.PI *
        2;

    const ondaX =
        Math.sin(
            t * frecuencia
        ) *
        amplitudx;

    const ondaY =
        Math.cos(
            t * frecuencia
        ) *
        amplitudy;

    const x =
        (
            16 *
            Math.pow(
                Math.sin(t),
                3
            ) +
            ondaX
        ) *
        0.4;

    const y =
        (
            13 *
            Math.cos(t)
            -
            5 *
            Math.cos(2 * t)
            -
            2 *
            Math.cos(3 * t)
            -
            Math.cos(4 * t)
            +
            ondaY
        ) *
        0.4;

    const z =
        (Math.random() - 0.5) * 2;

    puntosCorazones.push(
        x,
        y,
        z
    );

}


// =====================================================
// POSICIONES INICIALES
// =====================================================

const posicionesCorazon =
    geometryCorazon.attributes.position;

const posicionesInicialesCorazon = [];

for (
    let i = 0;
    i < cantidad;
    i++
) {

    posicionesInicialesCorazon.push(

        posicionesCorazon.getX(i),

        posicionesCorazon.getY(i),

        posicionesCorazon.getZ(i)

    );

}


// =====================================================
// VARIABLES DE ANIMACION
// =====================================================

let estado = 'corazon';

let tiempoTornado = 0;

let tiempoRosa = 0;


// =====================================================
// ELEMENTOS HTML
// =====================================================

const contenido =
    document.querySelector('.contenido');

const boton =
    document.getElementById('miBoton');


// =====================================================
// ROSA
// =====================================================

const rosa =
    new THREE.Group();

scene.add(
    rosa
);


// =====================================================
// TEXTURA DE LA ROSA
// =====================================================

function crearTexturaRosa() {

    const canvas =
        document.createElement('canvas');

    canvas.width = 64;
    canvas.height = 64;

    const ctx =
        canvas.getContext('2d');

    const gradiente =
        ctx.createRadialGradient(

            32,
            32,
            0,

            32,
            32,
            32

        );

    gradiente.addColorStop(
        0,
        'rgba(255,255,210,1)'
    );

    gradiente.addColorStop(
        0.12,
        'rgba(255,240,100,0.95)'
    );

    gradiente.addColorStop(
        0.30,
        'rgba(150,145,30,0.75)'
    );

    gradiente.addColorStop(
        0.55,
        'rgba(70,80,15,0.45)'
    );

    gradiente.addColorStop(
        0.78,
        'rgba(25,40,8,0.18)'
    );

    gradiente.addColorStop(
        1,
        'rgba(0,0,0,0)'
    );

    ctx.fillStyle =
        gradiente;

    ctx.fillRect(
        0,
        0,
        64,
        64
    );

    return new THREE.CanvasTexture(
        canvas
    );

}


const texturaRosa =
    crearTexturaRosa();


// =====================================================
// MATERIALES ROSA
// =====================================================

const materialInterior =
    new THREE.PointsMaterial({

        size: 0.048,

        color: 0x5f7f16,

        map: texturaRosa,

        transparent: true,

        opacity: 0.88,

        depthWrite: false,

        blending:
            THREE.AdditiveBlending,

        sizeAttenuation: true

    });


const materialPetalo =
    new THREE.PointsMaterial({

        size: 0.052,

        color: 0xffd900,

        map: texturaRosa,

        transparent: true,

        opacity: 0.88,

        depthWrite: false,

        blending:
            THREE.AdditiveBlending,

        sizeAttenuation: true

    });


const materialBorde =
    new THREE.PointsMaterial({

        size: 0.065,

        color: 0xffff06,

        map: texturaRosa,

        transparent: true,

        opacity: 1,

        depthWrite: false,

        blending:
            THREE.AdditiveBlending,

        sizeAttenuation: true

    });


const materialCentro =
    new THREE.PointsMaterial({

        size: 0.060,

        color: 0x8aaa20,

        map: texturaRosa,

        transparent: true,

        opacity: 0.95,

        depthWrite: false,

        blending:
            THREE.AdditiveBlending,

        sizeAttenuation: true

    });


const materialTallo =
    new THREE.PointsMaterial({

        size: 0.047,

        color: 0x246b24,

        map: texturaRosa,

        transparent: true,

        opacity: 0.95,

        depthWrite: false,

        blending:
            THREE.AdditiveBlending,

        sizeAttenuation: true

    });


const materialFlotante =
    new THREE.PointsMaterial({

        size: 0.045,

        color: 0xe6f34a,

        map: texturaRosa,

        transparent: true,

        opacity: 0.55,

        depthWrite: false,

        blending:
            THREE.AdditiveBlending,

        sizeAttenuation: true

    });


// =====================================================
// CREAR PUNTOS
// =====================================================

function crearPuntos(
    vertices,
    material
) {

    const geometry =
        new THREE.BufferGeometry();

    geometry.setAttribute(

        'position',

        new THREE.Float32BufferAttribute(
            vertices,
            3
        )

    );

    geometry.computeBoundingSphere();

    return new THREE.Points(
        geometry,
        material
    );

}


// =====================================================
// PETALO
// =====================================================

function crearPetalo(

    angulo,
    radio,
    ancho,
    alto,
    profundidad,
    inclinacion

) {

    const interior = [];

    const bordes = [];

    const cantidadInterior = 330;

    const cantidadBorde = 170;

    const cosA =
        Math.cos(angulo);

    const sinA =
        Math.sin(angulo);


    // =================================================
    // INTERIOR
    // =================================================

    for (
        let i = 0;
        i < cantidadInterior;
        i++
    ) {

        const u =
            Math.random();

        const v =
            Math.random() * 2 - 1;

        const forma =
            Math.sin(
                u * Math.PI
            );

        let lateral =
            v *
            ancho *
            forma;

        let y =
            Math.sin(
                u * Math.PI
            ) *
            0.25;

        const borde =
            Math.pow(
                Math.abs(v),
                3
            );

        y +=

            borde *
            Math.pow(
                u,
                1.3
            ) *
            0.50;

        y -=

            (1 - Math.abs(v)) *
            Math.sin(
                u * Math.PI
            ) *
            0.13;

        lateral +=

            Math.sign(v) *
            Math.pow(
                Math.abs(v),
                2.2
            ) *
            Math.pow(
                u,
                1.6
            ) *
            0.25;

        const distancia =

            radio *
            (
                0.32 +
                u * 0.72
            );

        const radialX =
            cosA *
            distancia;

        const radialZ =
            sinA *
            distancia;

        const lateralX =
            -sinA *
            lateral;

        const lateralZ =
            cosA *
            lateral;

        const avance =

            (u - 0.5) *
            radio *
            1.45;

        const x =

            radialX +
            lateralX +
            cosA *
            avance *
            0.18;

        const z =

            radialZ +
            lateralZ +
            sinA *
            avance *
            0.18;

        const yFinal =

            3.10 +
            y +
            inclinacion;

        interior.push(
            x,
            yFinal,
            z
        );

    }


    // =================================================
    // BORDES
    // =================================================

    for (
        let lado = -1;
        lado <= 1;
        lado += 2
    ) {

        for (
            let i = 0;
            i < cantidadBorde;
            i++
        ) {

            const u =
                i / cantidadBorde;

            const ruido =

                (
                    Math.random() -
                    0.5
                ) *
                0.035;

            const lateral =

                lado *
                ancho *
                Math.sin(
                    u * Math.PI
                );

            const levantamiento =

                Math.pow(
                    u,
                    1.15
                ) *
                0.70;

            const punta =

                Math.pow(

                    Math.max(
                        0,
                        u - 0.72
                    ) / 0.28,

                    1.7

                );

            const y =

                3.10 +
                levantamiento +
                punta * 0.12 +
                inclinacion +
                ruido;

            const distancia =

                radio *
                (
                    0.32 +
                    u * 0.72
                );

            const radialX =
                cosA *
                distancia;

            const radialZ =
                sinA *
                distancia;

            const lateralX =
                -sinA *
                lateral;

            const lateralZ =
                cosA *
                lateral;

            const x =
                radialX +
                lateralX;

            const z =
                radialZ +
                lateralZ;

            bordes.push(
                x,
                y,
                z
            );

        }

    }


    return {
        interior,
        bordes
    };

}


// =====================================================
// CAPAS DE PETALOS
// =====================================================

const capas = [

    {
        cantidad: 11,
        radio: 1.62,
        ancho: 1.05,
        alto: 0.70,
        profundidad: 0.55,
        inclinacion: 0.00
    },

    {
        cantidad: 10,
        radio: 1.40,
        ancho: 0.92,
        alto: 0.74,
        profundidad: 0.48,
        inclinacion: 0.06
    },

    {
        cantidad: 9,
        radio: 1.18,
        ancho: 0.82,
        alto: 0.78,
        profundidad: 0.42,
        inclinacion: 0.12
    },

    {
        cantidad: 8,
        radio: 0.97,
        ancho: 0.72,
        alto: 0.82,
        profundidad: 0.36,
        inclinacion: 0.18
    },

    {
        cantidad: 7,
        radio: 0.77,
        ancho: 0.62,
        alto: 0.85,
        profundidad: 0.30,
        inclinacion: 0.24
    },

    {
        cantidad: 6,
        radio: 0.58,
        ancho: 0.53,
        alto: 0.82,
        profundidad: 0.25,
        inclinacion: 0.29
    },

    {
        cantidad: 5,
        radio: 0.40,
        ancho: 0.45,
        alto: 0.72,
        profundidad: 0.20,
        inclinacion: 0.33
    }

];


const elementosRosa = [];


// =====================================================
// CREAR PETALOS
// =====================================================

for (
    let c = 0;
    c < capas.length;
    c++
) {

    const capa =
        capas[c];

    for (
        let p = 0;
        p < capa.cantidad;
        p++
    ) {

        const angulo =

            (
                p /
                capa.cantidad
            ) *
            Math.PI *
            2
            +
            c * 0.35;

        const petalo =
            crearPetalo(

                angulo,
                capa.radio,
                capa.ancho,
                capa.alto,
                capa.profundidad,
                capa.inclinacion

            );

        const relleno =
            crearPuntos(

                petalo.interior,

                c % 2 === 0
                    ? materialPetalo
                    : materialInterior

            );

        const borde =
            crearPuntos(

                petalo.bordes,

                materialBorde

            );

        rosa.add(
            relleno
        );

        rosa.add(
            borde
        );

        elementosRosa.push({

            objeto: relleno,

            tipo: 'petalo'

        });

        elementosRosa.push({

            objeto: borde,

            tipo: 'borde'

        });

    }

}


// =====================================================
// CENTRO DE LA ROSA
// =====================================================

const centro = [];

const cantidadCentro = 1800;

for (
    let i = 0;
    i < cantidadCentro;
    i++
) {

    const t =
        Math.random();

    const angulo =

        t *
        Math.PI *
        2 *
        5.5;

    const radio =

        0.03 +
        t * 0.52;

    const x =

        Math.cos(
            angulo
        ) *
        radio;

    const z =

        Math.sin(
            angulo
        ) *
        radio *
        0.55;

    const y =

        3.48 +
        t * 0.40;

    centro.push(
        x,
        y,
        z
    );

}


const objetoCentro =
    crearPuntos(
        centro,
        materialCentro
    );

rosa.add(
    objetoCentro
);

elementosRosa.push({

    objeto: objetoCentro,

    tipo: 'centro'

});


// =====================================================
// NUCLEO
// =====================================================

const nucleo = [];

for (
    let i = 0;
    i < 250;
    i++
) {

    const a =
        Math.random() *
        Math.PI *
        2;

    const r =
        Math.random() *
        0.15;

    nucleo.push(

        Math.cos(a) * r,

        3.88 +
        Math.random() * 0.08,

        Math.sin(a) * r

    );

}


const objetoNucleo =
    crearPuntos(
        nucleo,
        materialInterior
    );

rosa.add(
    objetoNucleo
);

elementosRosa.push({

    objeto: objetoNucleo,

    tipo: 'nucleo'

});


// =====================================================
// TALLO
// =====================================================

const tallo = [];

const cantidadTallo = 1800;

for (
    let i = 0;
    i < cantidadTallo;
    i++
) {

    const t =
        Math.random();

    const y =

        0.15 +
        t * 2.95;

    const centroX =

        Math.sin(
            t *
            Math.PI *
            1.15
        ) *
        0.11;

    const radio =
        0.042;

    const a =

        Math.random() *
        Math.PI *
        2;

    tallo.push(

        centroX +
        Math.cos(a) *
        radio,

        y,

        Math.sin(a) *
        radio

    );

}


const objetoTallo =
    crearPuntos(
        tallo,
        materialTallo
    );

rosa.add(
    objetoTallo
);

elementosRosa.push({

    objeto: objetoTallo,

    tipo: 'tallo'

});


// =====================================================
// HOJAS
// =====================================================

function crearHoja(

    xBase,
    yBase,
    direccion

) {

    const interior = [];

    const borde = [];

    const cantidadHoja = 650;

    for (
        let i = 0;
        i < cantidadHoja;
        i++
    ) {

        const u =
            Math.random();

        const v =
            Math.random() * 2 - 1;

        const largo =
            u * 1.15;

        const ancho =

            Math.sin(
                u * Math.PI
            ) *
            0.36;

        const lateral =
            v * ancho;

        const x =

            xBase +
            direccion * largo +
            lateral * 0.45;

        const y =

            yBase +
            largo * 0.35;

        const z =

            lateral +
            Math.sin(
                u * Math.PI
            ) *
            0.05;

        interior.push(
            x,
            y,
            z
        );

    }

    for (
        let lado = -1;
        lado <= 1;
        lado += 2
    ) {

        for (
            let i = 0;
            i < 100;
            i++
        ) {

            const u =
                i / 100;

            const largo =
                u * 1.15;

            const ancho =

                Math.sin(
                    u * Math.PI
                ) *
                0.36;

            const x =

                xBase +
                direccion * largo +
                lado * ancho * 0.45;

            const y =

                yBase +
                largo * 0.35 +
                0.03;

            const z =
                lado * ancho;

            borde.push(
                x,
                y,
                z
            );

        }

    }

    const objetoInterior =
        crearPuntos(
            interior,
            materialTallo
        );

    const objetoBorde =
        crearPuntos(
            borde,
            materialBorde
        );

    rosa.add(
        objetoInterior
    );

    rosa.add(
        objetoBorde
    );

    elementosRosa.push({

        objeto: objetoInterior,

        tipo: 'hoja'

    });

    elementosRosa.push({

        objeto: objetoBorde,

        tipo: 'bordeHoja'

    });

}


crearHoja(
    -0.05,
    1.55,
    -1
);

crearHoja(
    0.04,
    1.10,
    1
);


// =====================================================
// PARTICULAS FLOTANTES
// =====================================================

const flotantes = [];

const cantidadFlotantes = 450;

for (
    let i = 0;
    i < cantidadFlotantes;
    i++
) {

    const angulo =
        Math.random() *
        Math.PI *
        2;

    const radio =
        2.2 +
        Math.random() * 2.4;

    const x =
        Math.cos(
            angulo
        ) *
        radio;

    const z =
        Math.sin(
            angulo
        ) *
        radio *
        0.75;

    const y =
        0.3 +
        Math.random() *
        4.8;

    flotantes.push(
        x,
        y,
        z
    );

}


const geometriaFlotantes =
    new THREE.BufferGeometry();

geometriaFlotantes.setAttribute(

    'position',

    new THREE.Float32BufferAttribute(
        flotantes,
        3
    )

);


const puntosFlotantes =
    new THREE.Points(

        geometriaFlotantes,

        materialFlotante

    );

scene.add(
    puntosFlotantes
);


// =====================================================
// ROSA OCULTA AL INICIO
// =====================================================

rosa.visible = false;

puntosFlotantes.visible = false;


// =====================================================
// CONTROLES
// =====================================================

const controls =
    new OrbitControls(
        camara,
        render.domElement
    );

controls.enableRotate = true;

controls.enableZoom = true;

controls.enablePan = true;

controls.mouseButtons.LEFT =
    THREE.MOUSE.ROTATE;

controls.mouseButtons.RIGHT =
    THREE.MOUSE.PAN;


// =====================================================
// BOTON
// =====================================================

boton.addEventListener(
    'click',
    () => {

        if (
            estado !== 'corazon'
        ) {

            return;

        }

        contenido.style.display =
            'none';

        estado =
            'tornado';

        tiempoTornado =
            0;

    }
);


// =====================================================
// RELOJ
// =====================================================

const reloj =
    new THREE.Clock();


// =====================================================
// ANIMACION
// =====================================================

function animate() {

    requestAnimationFrame(
        animate
    );

    const delta =
        reloj.getDelta();

    const tiempo =
        reloj.getElapsedTime();


    // =================================================
    // CORAZON
    // =================================================

    if (
        estado === 'corazon'
    ) {

        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            const xActual =
                posicionesCorazon.getX(i);

            const yActual =
                posicionesCorazon.getY(i);

            const zActual =
                posicionesCorazon.getZ(i);

            const xObjetivo =
                puntosCorazones[i * 3];

            const yObjetivo =
                puntosCorazones[i * 3 + 1];

            const zObjetivo =
                puntosCorazones[i * 3 + 2];

            posicionesCorazon.setXYZ(

                i,

                xActual +
                (
                    xObjetivo -
                    xActual
                ) * 0.008,

                yActual +
                (
                    yObjetivo -
                    yActual
                ) * 0.008,

                zActual +
                (
                    zObjetivo -
                    zActual
                ) * 0.008

            );

        }

        posicionesCorazon.needsUpdate =
            true;

    }


    // =================================================
    // CAIDA DEL CORAZON
    // =================================================

    if (
        estado === 'tornado'
    ) {

        tiempoTornado +=
            delta;

        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            const xInicial =

                posicionesInicialesCorazon[
                    i * 3
                ];

            const yInicial =

                posicionesInicialesCorazon[
                    i * 3 + 1
                ];

            const zInicial =

                posicionesInicialesCorazon[
                    i * 3 + 2
                ];

            const velocidad =

                2.5 +
                (i % 17) * 0.08;

            const nuevoY =

                yInicial -
                tiempoTornado *
                velocidad;

            const movimientoX =

                Math.sin(

                    tiempoTornado * 1.5 +
                    i * 0.01

                ) *
                0.025;

            const movimientoZ =

                Math.cos(

                    tiempoTornado * 1.2 +
                    i * 0.015

                ) *
                0.025;

            posicionesCorazon.setXYZ(

                i,

                xInicial +
                movimientoX,

                nuevoY,

                zInicial +
                movimientoZ

            );

        }

        posicionesCorazon.needsUpdate =
            true;


        // -----------------------------------------
        // TERMINA LA CAIDA
        // -----------------------------------------

        if (
            tiempoTornado > 3.2
        ) {

            puntosCorazon.visible =
                false;

            rosa.visible =
                true;

            puntosFlotantes.visible =
                true;

            estado =
                'rosa';

            tiempoRosa =
                0;


            // =========================================
            // ROSA EN EL CENTRO
            // =========================================

            rosa.scale.set(
                0.55,
                0.55,
                0.55
            );

            rosa.position.set(
                0,
                -2.0,
                0
            );

            rosa.rotation.set(
                0,
                0,
                0
            );

        }

    }


    // =================================================
    // APARICION DE LA ROSA
    // =================================================

    if (
        estado === 'rosa'
    ) {

        tiempoRosa +=
            delta;


        // =================================================
        // POSICION FIJA
        // =================================================

        rosa.position.y = -2.0;


        // =================================================
        // CRECIMIENTO
        // =================================================

        const progresoEscala =

            Math.min(
                tiempoRosa / 3.2,
                1
            );

        const suaveEscala =

            1 -
            Math.pow(
                1 - progresoEscala,
                3
            );

        const escala =

            0.55 +
            0.45 *
            suaveEscala;

        rosa.scale.set(
            escala,
            escala,
            escala
        );


        // =================================================
        // APARICION DE TALLO, HOJAS Y PETALOS
        // =================================================

        for (
            const elemento
            of elementosRosa
        ) {

            const objeto =
                elemento.objeto;


            // ---------------------------------------------
            // TALLO
            // ---------------------------------------------

            if (
                elemento.tipo === 'tallo'
            ) {

                objeto.material.opacity =

                    Math.min(
                        tiempoRosa / 1.8,
                        1
                    ) *
                    0.95;

            }


            // ---------------------------------------------
            // HOJAS
            // ---------------------------------------------

            if (
                elemento.tipo === 'hoja'
            ) {

                objeto.material.opacity =

                    Math.min(
                        tiempoRosa / 1.8,
                        1
                    ) *
                    0.95;

            }


            // ---------------------------------------------
            // BORDE DE HOJAS
            // ---------------------------------------------

            if (
                elemento.tipo === 'bordeHoja'
            ) {

                objeto.material.opacity =

                    Math.min(
                        tiempoRosa / 1.8,
                        1
                    );

            }


            // ---------------------------------------------
            // PETALOS
            // ---------------------------------------------

            if (
                elemento.tipo === 'petalo' ||
                elemento.tipo === 'borde'
            ) {

                const inicio =
                    1.0;

                const duracion =
                    2.3;

                const progreso =

                    Math.min(

                        Math.max(

                            (
                                tiempoRosa -
                                inicio
                            ) /
                            duracion,

                            0

                        ),

                        1

                    );

                const suavizado =

                    1 -
                    Math.pow(
                        1 - progreso,
                        3
                    );

                objeto.material.opacity =

                    suavizado *
                    (
                        elemento.tipo === 'borde'
                            ? 1
                            : 0.88
                    );

            }


            // ---------------------------------------------
            // CENTRO
            // ---------------------------------------------

            if (
                elemento.tipo === 'centro' ||
                elemento.tipo === 'nucleo'
            ) {

                const progresoCentro =

                    Math.min(

                        Math.max(

                            (
                                tiempoRosa -
                                2.2
                            ) /
                            1.5,

                            0

                        ),

                        1

                    );

                objeto.material.opacity =

                    progresoCentro *
                    0.95;

            }

        }


        // =================================================
        // MOVIMIENTO FINAL
        // =================================================

        if (
            tiempoRosa > 4.5
        ) {

            rosa.position.y = -2.0;

            rosa.rotation.y =

                Math.sin(
                    tiempo * 0.35
                ) *
                0.08;

        }


        // =================================================
        // PARTICULAS FLOTANTES
        // =================================================

        puntosFlotantes.rotation.y =

            tiempo *
            0.018;

        puntosFlotantes.position.y =

            Math.sin(
                tiempo * 0.45
            ) *
            0.05;

    }


    // =================================================
    // CONTROLES
    // =================================================

    controls.update();


    // =================================================
    // RENDER
    // =================================================

    render.render(
        scene,
        camara
    );

}


animate();


// =====================================================
// RESIZE
// =====================================================

window.addEventListener(
    'resize',
    () => {

        camara.aspect =

            window.innerWidth /
            window.innerHeight;

        camara.updateProjectionMatrix();

        render.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }
);