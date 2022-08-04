import shutil
import time
import datetime

import pyglet
import json
import requests

def nft():
    print("save picture")
    pyglet.image.get_buffer_manager().get_color_buffer().save('screenshot00.png')
    data1['no'] = 33
    print("creating nft ...")
    post_read_nft()


data1 = {
    'no' : 1,
    'name' : 'Runoob',
    'url' : 'http://www.runoob.com'
}

def mint():
    json_str = json.dumps(data1)
    print("Python 原始数据：", repr(data1))
    print("JSON 对象：", json_str)

def post_get_all():
    # url = "http://localhost:3000"
    url = "http://localhost:3000/getAllFromAddress"
    data = {"userAddress": "ckt1qyqdqkh44kerxpgv3k95jnmdkrjtfdqjkttseg3n4p"}

    # 1
    # data = json.dumps(data) // 字典转json
    # headers = {'Content-Type': 'application/json'}
    # response = requests.post(url, data=data, headers=headers)
    # 2-json参数会自动将字典类型的对象转换为json格式
    res = requests.post(url, json=data)
    aa = json.loads(res.text)
    # print(aa)
    if len(aa) >= 1:
        # json_text = json.loads(aa[0]) // 字符串转字典
        val = aa[0]
        if val.get('type'):
            print(val.get('type'))
        else:
            print("error of get type")

def post_create_nft():
    start = time.time()
    url = "http://localhost:3000/mintNft"
    now = datetime.datetime.now().strftime('%Y-%m-%d-%H-%M-%S') #    %Y-%m-%d-%HH-%m-%S
    print("time is :", now)
    data = {"userAddress": "ckt1qyqdqkh44kerxpgv3k95jnmdkrjtfdqjkttseg3n4p",
            "url": "https://github.com/hongda3141/picture_lib/blob/main/screenshot00.png",
            "time": now}
    # data = {"test": "1111"}
    res = requests.post(url, json=data)
    end = time.time()
    print("create cost time :", end - start)
    if res.ok:
        print("create res: ", res.text)
        # para = json.loads(res.text)
        return res.text

def post_read_nft():
    start = time.time()
    url = "http://localhost:3000/readNft"
    data = post_create_nft()
    para = json.loads(data)
    # print(para)
    # data = {"codeHash":"0x9cef3391f34e14155caf019b47fc6e44ea31263ec87d62666ef0590f9defb774",
    #         "hashType":"type",
    #         "args":"0x00000000000000000000000000000000000000000000000000545950455f494401e3d262a1be543b4c19a35ff9a8cddc9ac795498646bcec820e967736273fda5c2a95f70886299c76ebbe4193a9ad79e6b88713d35641861227a6ba088f062908"}
    print("...waiting ")
    time.sleep(60)
    # res = requests.post(url, json=para)
    res = requests.post(url, para)
    # print("read res is :",res.text)
    if res.ok:
        info = json.loads(res.text)
        print("tokenId is: ",info.get('tokenId'))
    end = time.time()
    print("read cost time :", end - start)



import unittest

class TestStringMethods(unittest.TestCase):

    def test_upper(self):
        # self.assertEqual('foo'.upper(), 'FOO')
        # git_op()
        # pull()
        # add()
        # post_get_all()
        # post_create_nft()
        post_read_nft()
    # def test_isupper(self):
    #     self.assertTrue('FOO'.isupper())
    #     self.assertFalse('Foo'.isupper())
    #
    # def test_split(self):
    #     s = 'hello world'
    #     self.assertEqual(s.split(), ['hello', 'world'])
    #     # check that s.split fails when the separator is not a string
    #     with self.assertRaises(TypeError):
    #         s.split(2)

from git.repo import Repo
import os

def git_op():
    # 从远程仓库下载代码到本地   pull/clone
    download_path = os.path.join(os.path.pardir,'test','t1')
    # 从远程仓库将代码下载到上面创建的目录中
    # Repo.clone_from('https://github.com/ylpb/CMDB.git',to_path=download_path,branch='master')
    print(download_path)


#// picture_lib
# ############## 2. pull最新代码 ##############
import os
from git.repo import Repo
def pull():
    local_path = os.path.join(os.path.pardir,'picture_lib')
    repo = Repo(local_path)
    repo.git.pull()

def add():
    local_path = os.path.join(os.path.pardir, 'picture_lib')
    repo = Repo(local_path)
    shutil.copy('screenshot00.png', local_path)
    res = repo.index.add(items=["."])
    # print(res)
    res = repo.index.commit('write a line into test.file')
    # print(res)
    remote = repo.create_remote(name='hongda3141', url='git@github.com:hongda3141/picture_lib.git')
    # remote = repo.remote()
    remote.push()



if __name__ == '__main__':
    # mint()
    # post()
    unittest.main