# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  bio             :text
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_one_attached :photo 

  has_many :sounds,
           foreign_key: :uploader_id,
           class_name: :Sound,
           dependent: :destroy

  has_many :comments,
           foreign_key: :author_id,
           class_name: :Comment,
           dependent: :destroy

  has_many :likes,
           foreign_key: :user_id,
           class_name: :Like

  validates :email, :password_digest, :username, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, uniqueness: true
  after_initialize :ensure_session_token
  validates :username, uniqueness: true
  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end #! end of code
