import prisma from "@/prisma/db";
import DashRecentTickets from "@/components/DashRecentTickets";
import DashChart from "@/components/DashChart";

const Dashboard = async () => {
    const tickets = await prisma.ticket.findMany({
        where: {
            NOT: [{
                status: 'CLOSED',
            }],
        },
        orderBy: {
            updatedAt: 'desc',
        },
        skip: 0,
        take: 5,
        include: {
            assignedToUser: true,
        },
    });

    const groupTickets = await prisma.ticket.groupBy({
        by: ['status'],
        _count: {
            id: true,
        },
    })

    const groupUsers = await prisma.user.findMany({
        select: {
            name: true,
            _count: {
                select: {
                    assignedTicket: true,
                },
            },
        },
    });


    const ticketData = groupTickets.map((item) => {
        return {
            name: item.status,
            total: item._count.id,
        }
    })

    const userData = groupUsers.map((item) => ({
        name: item.name,
        total: item._count.assignedTicket,
    }));

    return (
        <div>
            <div className='grid gap-4 md:grid-cols-2 px-2'
                 style={{
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateAreas: `"a b"
                                    "a c"`,
            }}>
                <div style={{ gridArea: 'a' }}><DashRecentTickets tickets={tickets}/></div>
                <div style={{ gridArea: 'b' }}><DashChart data={ticketData} title={'Ticket counts'}/></div>
                <div style={{ gridArea: 'c' }} className="md:col-start-2"><DashChart data={userData} title='Tickets assigned to users count'/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;