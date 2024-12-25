/*
  # Create tokens table for storing meme token information

  1. New Tables
    - `tokens`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `description` (text)
      - `mint_address` (text)
      - `image_url` (text)
      - `supply` (numeric)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `tokens` table
    - Add policies for:
      - Users can read all tokens
      - Users can only insert their own tokens
      - Users can only update their own tokens
*/

CREATE TABLE IF NOT EXISTS tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  description text,
  mint_address text NOT NULL,
  image_url text,
  supply numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;

-- Everyone can view all tokens
CREATE POLICY "Tokens are viewable by everyone"
  ON tokens
  FOR SELECT
  USING (true);

-- Users can only insert their own tokens
CREATE POLICY "Users can insert their own tokens"
  ON tokens
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own tokens
CREATE POLICY "Users can update their own tokens"
  ON tokens
  FOR UPDATE
  USING (auth.uid() = user_id);