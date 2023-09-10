interface PickupLineResponse {
  pickup: string
}

export class PickupService {
  async getPickupLines(count = 1) {
    const pickupLines = await Promise.all(
      Array(count)
        .fill(null)
        .map(() => this.getLine())
    )

    return pickupLines
  }

  private async getLine() {
    const url = `https://vinuxd.vercel.app/api/pickup`
    const response = await fetch(url)
    const { pickup }: PickupLineResponse = await response.json()
    return pickup
  }
}

export const wingman = new PickupService()
