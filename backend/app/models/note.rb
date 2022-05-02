class Note < ApplicationRecord
  belongs_to :user

  CATEGORIES = %w[request comment alert]
  enum category: CATEGORIES.zip(CATEGORIES).to_h # string enum
end
