"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateSocket = authenticateSocket;
const supabase_js_1 = require("@supabase/supabase-js");
// Create a Supabase client for token verification
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey);
async function authenticateSocket(socket, next) {
    try {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error: No token provided'));
        }
        // Verify the token with Supabase
        const { data, error } = await supabase.auth.getUser(token);
        if (error || !data.user) {
            return next(new Error('Authentication error: Invalid token'));
        }
        // Attach the authenticated user to the socket
        socket.data.user = data.user;
        next();
    }
    catch (error) {
        console.error('Socket authentication error:', error);
        next(new Error('Authentication error'));
    }
}
