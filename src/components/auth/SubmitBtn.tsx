export default function SubmitBtn({
  isSubmitting,
  lable
}: {
  isSubmitting: boolean
  lable: string
}) {
  return (
    <button
      type="submit"
      className={`w-full text-white py-2 rounded transition duration-300 bg-primary hover:bg-primary-dimmer ${
        isSubmitting ? ' opacity-60 ' : ' '
      }`}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'loading' : lable}
    </button>
  )
}
