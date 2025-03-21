import { Message } from "../../entities/Chatentities";
import { IUser } from "../../entities/userEntities";

export interface IMessageServices {
  sendAllmessages(
    userId: string,
    content: string,
    chatId: string,
    imageUrls: string[],
    videoUrls: string[]
  ): Promise<Message | undefined>;
  blockUserhere(
    userId: string,
    logedUserId: string
  ): Promise<boolean | undefined>;
  findAllmessages(chatid: string): Promise<Message[] | undefined>;
  getUserInfomation(userid: string): Promise<IUser | null>;
}
