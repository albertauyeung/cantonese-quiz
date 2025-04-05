import json
import os
from pathlib import Path
from ToJyutping import get_jyutping_list

def extract_chinese(text):
    """Extract Chinese characters from a string."""
    return ''.join([char for char in text if '\u4e00' <= char <= '\u9fff'])

def process_file(file_path):
    """Process a single JSON file to add Jyutping to choices."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        for question in data['questions']:
            for choice in question['choices']:
                chinese_text = extract_chinese(choice['value'])
                if chinese_text:
                    # Get Jyutping for the Chinese text
                    jyutping = " ".join([jp for _, jp in get_jyutping_list(chinese_text)])
                    choice['value'] = f"{chinese_text} ({jyutping})"
        
        # Write the updated data back to the file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Processed {os.path.basename(file_path)}")
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")

def main():
    """Main function to process all JSON files."""
    try:
        # Get the data directory path
        data_dir = Path(__file__).parent.parent / 'src' / 'data'
        
        # Get all JSON files in the data directory
        json_files = [f for f in data_dir.glob('*.json')]
        
        # Process each file
        for file_path in json_files:
            process_file(file_path)
        
        print("All files processed successfully!")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main() 