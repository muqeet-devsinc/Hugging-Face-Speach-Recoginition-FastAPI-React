import os
from fastapi import FastAPI, UploadFile, File, HTTPException,status
from fastapi.middleware.cors import CORSMiddleware
from main import Text2Speach
import uvicorn
# Build paths inside the project like this: BASE_DIR / 'subdir'.
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="Whisper Model API")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def load_whisper_asr():
    whisper_singleton = Text2Speach()
    app.state.whisper_asr = whisper_singleton


async def is_audio_file(file: UploadFile) -> bool:
    content_type = file.content_type
    return content_type.startswith("audio/")


@app.post("/transcribe")
async def transcribe_audio(file: UploadFile= File(...)):

    if not await is_audio_file(file):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only audio files are allowed.",
        )


    media_folder = os.path.join(BASE_DIR, "temp")
          
    file_path = os.path.join(media_folder, file.filename)

    try:
        os.makedirs(media_folder)
    except Exception as e:
        print(e)


    with open(file_path, "wb") as audio_file:
        audio_file.write(await file.read())
    whisper_singleton = app.state.whisper_asr

    print("Object being used is ", whisper_singleton)

    
    transcriptions = whisper_singleton.whisper(file_path)


    try:
        os.remove(file_path)
        print(f"The file {file_path} has been successfully deleted.")
    except OSError as e:
        print(f"Error occurred while deleting the file: {e}")

    return transcriptions

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=30000,)