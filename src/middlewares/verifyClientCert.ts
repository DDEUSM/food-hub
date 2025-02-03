import { NextFunction } from "express";
import { CLIENT_CERT_FINGERPRINT, CLIENT_CERT_SERIAL } from "../env";

function isFingerPrintAllowed(fingerPrint: string){
    return fingerPrint === CLIENT_CERT_FINGERPRINT
}

function isSerialAllowed(serial: string){
    return serial === CLIENT_CERT_SERIAL
}

export function verifyCertificate(req: any, res: any, next: NextFunction){
    const cert = req.socket.getPeerCertificate()    
    if(!isFingerPrintAllowed(cert.fingerprint)){
        return res.status(401).end()
    }
    if(!isSerialAllowed(cert.serialNumber)){
        return res.status(401).end()
    }
	next()
}