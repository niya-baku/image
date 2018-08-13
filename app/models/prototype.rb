class Prototype < ApplicationRecord
  has_many :thumbnails
  accepts_nested_attributes_for :thumbnails
end
