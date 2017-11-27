class Content
	
	def initialize(filename, renderer)
		@filename = filename
		@renderer = renderer
	end

	def self.bash_dir
		"#{Rails.root.join('content')}"
	end

	def file_content
		load_file = "#{self.class.bash_dir}/#{@filename}.md"
		File.read(load_file) if File.exist? load_file
	end

	def html
    	parse_markdown.output.html_safe
  	end

	def metadata
		parse_markdown.metadata.try(:symbolize_keys) || {}
	end

	def parse_markdown 
		@markdown ||= begin
      		markdown = new_markdown(@renderer)
      		Metadown.render(file_content, markdown)
      	end
	end

	def new_markdown(renderer)
		Redcarpet::Markdown.new(
      		renderer,
      		no_intra_emphasis: true,
      		fenced_code_blocks: true,
      		lax_spacing: true
      	)
	end
end