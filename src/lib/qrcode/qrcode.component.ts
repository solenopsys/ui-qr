import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import * as qrcode from 'qrcode';

@Component({
  selector: 'ui-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent {
  @ViewChild('qrCodeCanvas', { static: true }) qrCodeCanvas: ElementRef;

  @Input()
  size = 200;

  @Input('data')
  set setData(data: string) {


    // Generate the QR code as a data URI
    qrcode.toDataURL(data,{
        width: this.size,
        height: this.size,
        colorDark : "#000000",
        colorLight : "#ffffff",
    })
        .then(url => {
          // Render the QR code on the canvas
          const canvas = this.qrCodeCanvas.nativeElement;
          const context = canvas.getContext('2d');
          const img = new Image();
          img.onload = () => {
            context.drawImage(img, 0, 0);
          };
          img.src = url;
        })
        .catch(err => console.error(err));
  }
}
