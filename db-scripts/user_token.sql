CREATE TYPE token_type AS ENUM ('verify_email', 'reset_password');

CREATE TABLE user_tokens(
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  token VARCHAR(512) NOT NULL,
  type token_type NOT NULL,
  exprires_at NOT NULL TIMESTAMP,
  created_at NOT NULL TIMESTAMP DEFAULT CUURENT_TIMESTAMP,
  updated_at NOT NULL TIMESTAMP DEFAULT CUURENT_TIMESTAMP
);

ALTER TABLE user_tokens ADD CONSTRAINT pk_id UNIQUE(id);
ALTER TABLE user_tokens ADD CONSTRAINT uk_token UNIQUE(token);
ALTER TABLE user_tokens ADD CONSTRAINT fk_user_profile_user_id FOREIGN KEY (user_id) REFERENCES users (user_id);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON user_tokens
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
