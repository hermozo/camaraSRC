import {Component} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {File} from '@ionic-native/file/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    public imagen: any;

    constructor(private camera: Camera, private file: File, private webview: WebView) {
        this.imagen = '../../assets/data.jpg';
    }

    public async camara() {

        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA
        }
        try {
            const tempImage = await this.camera.getPicture(options);
            let img = tempImage.split('/');
            let nombre = img[img.length - 1];
            let tempPath = tempImage.substr(0, tempImage.lastIndexOf('/') + 1);
            let pathExternal = this.file.externalApplicationStorageDirectory;
            console.log(pathExternal);
            console.log(pathExternal + nombre);
            try {
                await this.file.moveFile(tempPath, nombre, pathExternal, nombre);
                this.imagen = this.webview.convertFileSrc(pathExternal + nombre) //pathExternal + nombre;
            } catch (e) {
                console.log('Error ESCRITURA MMMM');
                console.log(e);
            }
        } catch (e) {
            console.log('ERRRROR R de camara ');
            console.log(e);
        }
    }
}
