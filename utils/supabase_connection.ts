import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://pnbnchjzkepukqraenda.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjEwNDI3OCwiZXhwIjoxOTMxNjgwMjc4fQ.X14RsSztK6Lur4dK4bRc5Yl0JyxceTfzmTjCNnzO15E",
  {}
);

export default supabaseClient;
