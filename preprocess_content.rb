module Jekyll
  module PreprocessContent
    class ContentPreprocessor < Jekyll::Generator
      priority :high # Run this before other generators
      def generate(site)
        site.pages.each { |page| preprocess(page) }
        site.posts.docs.each { |post| preprocess(post) } if site.posts
      end

      private

      def preprocess(document)
        return unless document.content # Skip if no content
        document.content = document.content.gsub('the', 'test')
      end
    end
  end
end
