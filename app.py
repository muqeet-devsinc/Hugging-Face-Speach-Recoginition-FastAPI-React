import os
from pathlib import Path
from fastapi import FastAPI, UploadFile, File
from main import Text2Speach
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="Whisper Model API")

@app.on_event("startup")
async def load_whisper_asr():
    whisper_singleton = Text2Speach()
    app.state.whisper_asr = whisper_singleton

@app.get("/")
def health():
    return {
        "status" : "OK",
        "detail": "API is working"
    }


@app.post("/transcribe")
async def transcribe_audio(file: UploadFile= File(...)):


    media_folder = os.path.join(BASE_DIR, "temp")
          
    file_path = os.path.join(media_folder, file.filename)

    try:
        os.makedirs(media_folder)
    except Exception as e:
        print(e)


    with open(file_path, "wb") as audio_file:
        audio_file.write(await file.read())
    whisper_singleton = app.state.whisper_asr
    transcriptions = whisper_singleton.whisper(file_path)


    try:
        os.remove(file_path)
        print(f"The file {file_path} has been successfully deleted.")
    except OSError as e:
        print(f"Error occurred while deleting the file: {e}")

    return transcriptions