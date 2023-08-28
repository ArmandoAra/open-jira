import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {

    if (req.nextUrl.pathname.startsWith('/api/entries/')) {
        const id = req.nextUrl.pathname.replace('/api/entries/', '');
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$"); // para hacer la verificacion de que el mongo id es valido 
        if (!checkMongoIDRegExp.test(id)) {
            const url = req.nextUrl.clone();
            url.pathname = '/api/bad-request'
            url.search = `?message=${id} is not a valid MongoID` //Aqui estamos definiendo el mensaje que queremos enviar al bad request

            return NextResponse.rewrite(url);
        }
    }

    return NextResponse.next()
}

// Esto es para que solo se aplique a las rutas especificadas
export const config = {
    matcher: '/api/entries/:path*',
}