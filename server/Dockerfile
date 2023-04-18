FROM python:3.13-alpine

WORKDIR /app

COPY . /app

RUN --mount=type=cache,target=/root/.cache/pip pip3 install -r requirements.txt

ENTRYPOINT [ "python" ]
CMD [ "app.py" ]
