from pdf2image import convert_from_path
from PIL import Image
import sys, os

def combine_images_to_single_image(images):
    widths, heights = zip(*(i.size for i in images))

    total_height = sum(heights)
    max_width = max(widths)

    combined_image = Image.new('RGB', (max_width, total_height))

    y_offset = 0
    for im in images:
        combined_image.paste(im, (0, y_offset))
        y_offset += im.size[1]

    return combined_image

def convert_pdf_to_single_image(pdf_path, output_folder, original_file_name):
    print(f"Received PDF path: {pdf_path}")
    print(f"Output folder: {output_folder}")
    print(f"Original file name: {original_file_name}")

    # Use original_file_name for output image name
    image_name = os.path.splitext(original_file_name)[0] + ".jpg"
    image_path = os.path.join(output_folder, image_name)

    try:
        print("Starting PDF to image conversion...")
        images = convert_from_path(pdf_path)
        print(f"Number of pages converted: {len(images)}")

        if len(images) > 0:
            combined_image = combine_images_to_single_image(images)
            combined_image.save(image_path, 'JPEG')
            print(f"Saved combined image: {image_path}")
            return image_path
        else:
            print("No pages found in PDF")
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python3 convert_pdf_to_images.py <pdf_path> <output_folder> <original_file_name>")
        sys.exit(1)

    _, pdf_path, output_folder, original_file_name = sys.argv
    convert_pdf_to_single_image(pdf_path, output_folder, original_file_name)
