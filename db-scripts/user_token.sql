CREATE TYPE token_type AS ENUM ('verify_email', 'reset_password');

CREATE TABLE user_tokens(
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  token_hash VARCHAR(512) DEFAULT NULL,
  type token_type NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE user_tokens ADD CONSTRAINT pk_user_tokens_id UNIQUE(id);
ALTER TABLE user_tokens ADD CONSTRAINT uk_user_id_type UNIQUE(user_id, type);
ALTER TABLE user_tokens ADD CONSTRAINT uk_token_hash UNIQUE(token_hash);
ALTER TABLE user_tokens ADD CONSTRAINT fk_user_profile_user_id FOREIGN KEY (user_id) REFERENCES users (user_id);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON user_tokens
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
