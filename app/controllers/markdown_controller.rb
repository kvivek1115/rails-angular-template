class MarkdownController < ApplicationController
  def index
  	@content = Content.new('example', Metadown::Renderer.new)
  end
end
