export interface Chat {
    id: string;
    title: string;
    content: string;
  }
  
  export interface ShareLinkInfo {
    link: string;
    qrCode: string;
  }
  
  export type ChatType = "gesture-to-text" | "text-to-sign" | "upload-file";