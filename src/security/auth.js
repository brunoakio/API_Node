import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const user = {
    name: 'Format',
    email: 'format@vitru.com'
}

export default function tokenValited(
    request,
    response,
    next
) {
    const [, token] = request.headers.authorization?.split(' ') || [' ', ' '];
    console.log(token);
    if(!token) return response.status(401).send('Acess denied. No token provided.');

    try {
        const payload = jwt.verify(token, PRIVATE_KEY);
        const userIdFromToken = typeof payload !== 'string' && payload.user;

        if(!user && !userIdFromToken) {
            return response.send(401).json({ message: 'Invalid token' });
        }
        request.headers['process.env.user'] = payload.user;

        return next();
    } catch(error) {
        console.log(error);
        return response.status(401).json({ message: 'Invalid token' });
    }
}