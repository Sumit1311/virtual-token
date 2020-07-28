import AddAccountDTO from "../../dto/AddAccountDTO";
import AddCustomerDTO from "../../dto/AddCustomerDTO";
import constants from "../../constants";
import { IAccount } from "../models/account";
import QueueModel, { IQueue } from "../models/queue";
import { getGuid, getChannelType } from "../../helpers";
import CallCustomerDTO from "../../dto/CallCustomerDTO";
import GetCustomersDTO from "../../dto/GetCustomersDTO";

export default function toQueueSchema(data: AddCustomerDTO | CallCustomerDTO | GetCustomersDTO) {
    if (data instanceof AddCustomerDTO) {
        return addCustomerDTOToQueueSchema(data);
    } else if (data instanceof CallCustomerDTO) {
        return callCustomerDTOToQueueSchema(data);
    } else if (data instanceof GetCustomersDTO) {
        return getCustomersDTOToQueueSchema(<GetCustomersDTO>data);
    } else {
        throw new Error(constants.INVALID_DTO);
    }
}

function addCustomerDTOToQueueSchema(data: AddCustomerDTO) {
    let queue: IQueue = new QueueModel();
    queue.queueId = getGuid();
    queue.mobileNo = data.mobileNo;
    queue.channel = getChannelType(data.channel);
    queue.active = true;
    return queue;
}

function callCustomerDTOToQueueSchema(data: CallCustomerDTO) {
    let queue: IQueue = new QueueModel();
    queue.accountId = data.accountId;
    return queue;
}

function getCustomersDTOToQueueSchema(data: GetCustomersDTO) {
    let queue = new QueueModel();
    queue.accountId = data.accountId;
    return queue;
}