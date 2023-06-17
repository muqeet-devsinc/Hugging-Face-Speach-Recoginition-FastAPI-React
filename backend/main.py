from transformers import pipeline

class Text2Speach:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.whisper = pipeline('automatic-speech-recognition', model='openai/whisper-small')
        return cls._instance


if __name__ == "__main__":

    whisper_singleton = Text2Speach()
    transcriptions = whisper_singleton.whisper('audio.flac')
    print(transcriptions)
