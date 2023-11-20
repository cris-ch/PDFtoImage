from pdf2image import convert_from_path
import sys

def convert_pdf_to_images(pdf_path, output_folder):
    print(f"Received PDF path: {pdf_path}")
    print(f"Output folder: {output_folder}")

    try:
        print("Starting PDF to image conversion...")
        images = convert_from_path(pdf_path)
        print(f"Number of pages converted: {len(images)}")

        image_paths = []
        for i, image in enumerate(images):
            image_path = f"{output_folder}/page_{i}.jpg"
            image.save(image_path, 'JPEG')
            print(f"Saved image: {image_path}")
            image_paths.append(image_path)
        
        return image_paths
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

# Example usage (uncomment and replace paths when testing directly)
test_pdf_path = 'Empadronamiento _Reus.pdf'  # Replace with your test PDF path
test_output_folder = 'output'  # Replace with your output folder path
convert_pdf_to_images(test_pdf_path, test_output_folder)
