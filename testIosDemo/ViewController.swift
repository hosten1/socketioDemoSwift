//
//  ViewController.swift
//  testIosDemo
//
//  Created by luoyongmeng on 2022/2/24.
//

import UIKit

class ViewController: UIViewController {
    var socket:SocketIOClient? = nil
    var manager:SocketManager? = nil
    override func viewDidLoad() {
        super.viewDidLoad()
        manager = SocketManager(socketURL: URL(string: "http://192.168.140.184:8000")!, config: [.log(false), .compress,.secure(false),.forceWebsockets(true)])
        socket = manager?.defaultSocket

        socket?.on(clientEvent: .connect) {data, ack in
            print("socket connected")
        }

        socket?.on("currentAmount") {data, ack in
//            guard let cur = data[0] as? Dictionary<Any, Any> else { return }
            
            self.socket?.emitWithAck("canUpdate",["amount": 10 + 2.50] ).timingOut(after: 0) {data in
                if data.first as? String ?? "passed" == SocketAckStatus.noAck {
                    // Handle ack timeout
                }

                self.socket?.emit("update", ["amount": 20 + 2.50])
            }

            ack.with("Got your currentAmount", "dude")
        }

        socket?.connect()
        // Do any additional setup after loading the view.
    }


}

