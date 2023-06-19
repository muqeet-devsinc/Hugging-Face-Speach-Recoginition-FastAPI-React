from transformers import pipeline
import os
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent

class Text2Speach:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.whisper = pipeline('automatic-speech-recognition', model='openai/whisper-small')
        return cls._instance


if __name__ == "__main__":

    whisper_singleton = Text2Speach()
    transcriptions = whisper_singleton.whisper(os.path.join(BASE_DIR,'audio.flac'))
    print(transcriptions)
