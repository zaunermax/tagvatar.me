const protocol = process.env['HTTP_PROTOCOL'] ?? 'http';
const host = process.env['VERCEL_URL'] ?? 'localhost:3000';

export const getServerURL = () => `${protocol}://${host}`;
