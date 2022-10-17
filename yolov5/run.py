from bs4 import ResultSet
from flask import Flask, render_template, request, redirect, url_for, session
import subprocess, io, os, json
from PIL import Image
from matplotlib.font_manager import json_dump
import torch
import base64
import food_converter as fc

app = Flask(__name__)

RESULT_FOLDER = os.path.join('static')
app.config['RESULT_FOLDER'] = RESULT_FOLDER

PATH = "runs/train/yolov5s6_perf43/weights/best.pt"

model = torch.hub.load('ultralytics/yolov5', 'custom', 
                       path='./runs/train/yolov5s6_perf43/weights/best.pt', force_reload=True)

@app.route('/train', methods=['GET','POST'])
def train():
    subprocess.run("ls")
    subprocess.run(['python', 'train.py','--img', '640','--batch','32','--batch','32','--epochs','100','--data',
                    './data/custom_dataset.yaml', '--cfg', 'models/yolov5n.yaml', '--weights','yolov5npt', '--name','yolov5n'])

def get_prediction(img_bytes):
    res_item = []
    res_conf = []
    img = img_bytes
    #img = Image.open(io.BytesIO(img))
    img = Image.open(io.BytesIO(base64.b64decode(img)))
    result = model(img, size=640)
    result.show()

    res_item.append((result.pandas().xyxy[0].name).tolist())
    res_conf.append((result.pandas().xyxy[0].confidence).tolist())
    print(res_item)
    print(res_conf)
    result_list = [res_item,res_conf]
    return result_list
    #return result
    


@app.route('/')
def hello():
    return "hello world"

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        print(request.is_json)
        #if 'file' not in request.files:
        #    return redirect(request.url)
        #file = request.files.get('file')
        file = request.get_json()
        print(file)
        
        if not file:
            return
        #file = request.get_data()          
        
        print('============작동=========')
        
        #file = file['image']
        img_bytes = file['image']
        #img_bytes = file.read()
        #img_bytes = Image.open('./a.jpg')
        #results = get_prediction(img_bytes)
        results = get_prediction(img_bytes)

        #results.save("static/")  # save as results1.jpg, results2.jpg... etc.
        #os.rename("/Volumes/Google Drive/내 드라이브/yolov5/runs/detect/exp/results0.jpg", "/Volumes/Google Drive/내 드라이브/yolov5/static/results0.jpg")
        #/Volumes/Google Drive/내 드라이브/yolov5/ing
        
        
        #print(str(results))
        #spring으로 넘어가면 사용
        """
        obj = json.dumps(results, default=str)
    
        aaa = ''
        for i in range(len(results[0][0])):
            aaa += str(results[0][0][i])+':'
        """
        
        #full_filename = os.path.join(app.config['RESULT_FOLDER'], 'results0.jpg')
        #return redirect('static/image0.jpg')
        food = results[0][0]
        food = set(food)
        food = list(food)
        food = fc.food_convert(food)
        lst = []
        print(food)
        if food == None:
            dic = {'food':food,'status':201}
        else:
            for i in range(len(food)):
                tmp = {'id':i+1,'name':food[i]}
                lst.append(tmp)
            dic = {'food':lst,"status":200}
        # 영 -> 한 변환 함수 만들기
        print(dic)
        dic = json.dumps(dic, default=str)
        #return json.dumps(results, default=str)
        #return json.dumps(food, default=str)
        return dic
    
        #spring으로 넘어가면 사용
        #print("http://localhost:8080/user/search/predict?obj="+aaa)
        #return redirect("http://localhost:8080/user/search/predict?obj="+aaa)
        #return redirect(url_for("http://localhost:8080/user/search/predict"),json = obj)
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port=5000)