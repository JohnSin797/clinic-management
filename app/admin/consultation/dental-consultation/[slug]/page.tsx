'use client'

export default function DentalConsultation({ params }: { params: { slug: string } }) {
    return (
        <div className="w-full flex justify-center items-center py-10">
            <section className="w-full md:w-2/3 rounded-lg shadow-xl p-5 bg-zinc-400">
                <header className="mb-5 font-semibold flex justify-between items-center">
                    <h1 className="text-2xl">Dental Consultation</h1>
                </header>
            </section>
        </div>
    )
}