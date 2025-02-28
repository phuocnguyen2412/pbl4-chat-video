import { log } from 'console'
import chatRoomModel from '../../chatRoom.model'
import userModel from '../../../user/user.model'
import { notificationService } from '../../../notifications/notification.service'
import { Types } from 'mongoose'

const addMember = async (chatRoomId: string, newMemberId: string, adminId: string) => {
    const chatRoom = await chatRoomModel.findById(chatRoomId)
    if (!chatRoom) throw new Error('Phòng chat không tồn tại!')

    if (chatRoom.typeRoom !== 'Group') throw new Error('Chỉ có room nhóm mới có thể thêm thành viên!')

    if (chatRoom.privacy === 'PRIVATE') {
        const isAdmin = chatRoom.admins.includes(new Types.ObjectId(adminId))
        const isModerator = chatRoom.moderators.includes(new Types.ObjectId(adminId))

        if (!isAdmin && !isModerator) throw new Error('Chỉ có admin hoặc moderator mới có quyền thêm thành viên!')
    }

    if (chatRoom.participants.includes(new Types.ObjectId(newMemberId))) {
        throw new Error('Thành viên đã có trong phòng chat!')
    }

    chatRoom.participants.push(new Types.ObjectId(newMemberId))
    await chatRoom.save()

    await notificationService.createNotification(
        `Bạn đã được thêm vào phòng chat ${chatRoom.name}`,
        newMemberId,
        'ChatRooms',
        chatRoom._id.toString()
    )

    const user = await userModel.findById(newMemberId)
    if (!user) {
        throw new Error('Người dùng không tồn tại!')
    }

    const message = `${user.name} đã được thêm vào nhóm ${chatRoom.name}.`

    const remainingMembers = chatRoom.participants.filter((member) => !member.equals(new Types.ObjectId(newMemberId)))
    for (const member of remainingMembers) {
        await notificationService.createNotification(message, member.toString(), 'ChatRooms', chatRoomId)
    }

    return chatRoom
}

export default addMember
