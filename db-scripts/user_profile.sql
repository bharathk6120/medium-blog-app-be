CREATE TABLE user_profiles(
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  bio TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE user_profiles ADD CONSTRAINT pk_user_profiles_id UNIQUE(id);
ALTER TABLE user_profiles ADD CONSTRAINT uk_user_profiles_user_id UNIQUE(user_id);
ALTER TABLE user_profiles ADD CONSTRAINT fk_user_profile_user_id FOREIGN KEY (user_id) REFERENCES users (user_id);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
